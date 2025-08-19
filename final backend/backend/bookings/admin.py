from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.utils.html import format_html
from .models import Booking, Payment, Transaction, Ticket

class PaymentInline(admin.StackedInline):
    model = Payment
    extra = 0
    fields = ('amount', 'status', 'transaction_id', 'created_at')
    readonly_fields = ('created_at',)
    show_change_link = True

class TransactionInline(admin.StackedInline):
    model = Transaction
    extra = 0
    fields = ('razorpay_payment_id', 'razorpay_order_id', 'razorpay_signature', 'created_at')
    readonly_fields = ('created_at',)

class TicketInline(admin.TabularInline):
    model = Ticket
    extra = 0
    fields = ('ticket_id', 'attendee_name', 'qr_code_preview', 'created_at')
    readonly_fields = ('ticket_id', 'qr_code_preview', 'created_at')
    
    def attendee_name(self, obj):
        return obj.attendee.get('name', 'N/A')
    attendee_name.short_description = 'Attendee'
    
    def qr_code_preview(self, obj):
        if obj.qr_code:
            return format_html('<img src="{}" width="100" />', obj.qr_code.url)
        return "Not generated"
    qr_code_preview.short_description = 'QR Code'

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id_short', 'event', 'lead_user', 'booking_status', 'ticket_quantity', 'total_price', 'created_at')
    list_filter = ('booking_status', 'created_at', 'event')
    search_fields = ('id', 'lead_user__email', 'event__title')
    readonly_fields = ('created_at', 'updated_at', 'id', 'payment_status')
    fieldsets = (
        ('Booking Information', {
            'fields': ('id', 'event', 'lead_user', 'user_details')
        }),
        ('Status & Payment', {
            'fields': ('booking_status', 'ticket_quantity', 'total_price', 'payment_status')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    inlines = [PaymentInline, TicketInline]
    
    def id_short(self, obj):
        return str(obj.id)[:8]
    id_short.short_description = 'Booking ID'
    
    def payment_status(self, obj):
        if hasattr(obj, 'payment'):
            return obj.payment.status
        return "No payment"
    payment_status.short_description = 'Payment Status'

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('transaction_id_short', 'booking_link', 'amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('transaction_id', 'booking__id', 'booking__lead_user__email')
    readonly_fields = ('created_at', 'payment_details')
    fieldsets = (
        ('Payment Information', {
            'fields': ('booking', 'amount', 'status', 'transaction_id')
        }),
        ('Additional Details', {
            'fields': ('payment_details',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    inlines = [TransactionInline]
    
    def transaction_id_short(self, obj):
        return obj.transaction_id[:8] if obj.transaction_id else "N/A"
    transaction_id_short.short_description = 'Transaction ID'
    
    def booking_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        url = reverse('admin:bookings_booking_change', args=[obj.booking.id])
        return format_html('<a href="{}">{}</a>', url, f"Booking {str(obj.booking.id)[:8]}")
    booking_link.short_description = 'Booking'
    
    def payment_details(self, obj):
        return f"Amount: {obj.amount}\nStatus: {obj.status}\nFor Event: {obj.booking.event.title}"
    payment_details.short_description = 'Details'

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('payment_link', 'razorpay_payment_short', 'razorpay_order_short', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('razorpay_payment_id', 'razorpay_order_id', 'payment__transaction_id')
    readonly_fields = ('created_at', 'transaction_details')
    fieldsets = (
        ('Transaction Information', {
            'fields': ('payment', 'razorpay_payment_id', 'razorpay_order_id', 'razorpay_signature')
        }),
        ('Additional Details', {
            'fields': ('transaction_details',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def razorpay_payment_short(self, obj):
        return obj.razorpay_payment_id[:8] if obj.razorpay_payment_id else "N/A"
    razorpay_payment_short.short_description = 'Razorpay PID'
    
    def razorpay_order_short(self, obj):
        return obj.razorpay_order_id[:8] if obj.razorpay_order_id else "N/A"
    razorpay_order_short.short_description = 'Razorpay OID'
    
    def payment_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        url = reverse('admin:bookings_payment_change', args=[obj.payment.id])
        return format_html('<a href="{}">{}</a>', url, f"Payment {obj.payment.transaction_id[:8]}")
    payment_link.short_description = 'Payment'
    
    def transaction_details(self, obj):
        details = [
            f"Payment ID: {obj.razorpay_payment_id}",
            f"Order ID: {obj.razorpay_order_id}",
            f"Amount: {obj.payment.amount}",
            f"For Booking: {obj.payment.booking.id}"
        ]
        return "\n".join(details)
    transaction_details.short_description = 'Details'

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('ticket_id_short', 'booking_link', 'attendee_name', 'qr_code_preview', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('ticket_id', 'booking__id', 'attendee__name')
    readonly_fields = ('created_at', 'qr_code_display', 'attendee_details')
    fieldsets = (
        ('Ticket Information', {
            'fields': ('booking', 'ticket_id')
        }),
        ('Attendee Details', {
            'fields': ('attendee_details',)
        }),
        ('QR Code', {
            'fields': ('qr_code_display', 'qr_code')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def ticket_id_short(self, obj):
        return str(obj.ticket_id)[:8]
    ticket_id_short.short_description = 'Ticket ID'
    
    def booking_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        url = reverse('admin:bookings_booking_change', args=[obj.booking.id])
        return format_html('<a href="{}">{}</a>', url, f"Booking {str(obj.booking.id)[:8]}")
    booking_link.short_description = 'Booking'
    
    def attendee_name(self, obj):
        return obj.attendee.get('name', 'N/A')
    attendee_name.short_description = 'Attendee'
    
    def qr_code_preview(self, obj):
        if obj.qr_code:
            return format_html('<img src="{}" width="50" />', obj.qr_code.url)
        return "Not generated"
    qr_code_preview.short_description = 'QR Code'
    
    def qr_code_display(self, obj):
        if obj.qr_code:
            return format_html('<img src="{}" width="200" />', obj.qr_code.url)
        return "Not generated"
    qr_code_display.short_description = 'QR Code Preview'
    
    def attendee_details(self, obj):
        details = []
        for key, value in obj.attendee.items():
            details.append(f"{key}: {value}")
        return "\n".join(details) if details else "No details"
    attendee_details.short_description = 'Details'