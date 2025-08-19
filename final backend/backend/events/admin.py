from django.contrib import admin
from .models import Event, Invitee, EventImage, EventVideo, EventRequest

class InviteeInline(admin.TabularInline):
    model = Invitee
    extra = 1
    fields = ('email', 'name', 'invite_status')
    readonly_fields = ('created_at', 'updated_at')

class EventImageInline(admin.TabularInline):
    model = EventImage
    extra = 1
    fields = ('image', 'image_preview')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        if obj.image:
            from django.utils.html import format_html
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "-"
    image_preview.short_description = 'Preview'

class EventVideoInline(admin.TabularInline):
    model = EventVideo
    extra = 1
    fields = ('video',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'event_type', 'status', 'start_date', 'end_date', 'current_attendees', 'max_attendees')
    list_filter = ('event_type', 'status', 'start_date')
    search_fields = ('title', 'description', 'organizer__username')
    readonly_fields = ('created_at', 'updated_at', 'current_attendees')
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'organizer', 'event_type', 'status')
        }),
        ('Event Details', {
            'fields': ('location', 'start_date', 'end_date', 'event_price')
        }),
        ('Attendance', {
            'fields': ('max_attendees', 'current_attendees')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    inlines = [InviteeInline, EventImageInline, EventVideoInline]
    date_hierarchy = 'start_date'
    ordering = ('-start_date',)

@admin.register(Invitee)
class InviteeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'event', 'invite_status', 'created_at')
    list_filter = ('invite_status', 'event')
    search_fields = ('name', 'email', 'event__title')
    readonly_fields = ('created_at', 'updated_at')
    autocomplete_fields = ['event']

@admin.register(EventRequest)
class EventRequestAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'expected_start_date', 'expected_end_date', 'budget', 'created_at')
    list_filter = ('expected_start_date',)
    search_fields = ('title', 'description', 'user__username')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Request Information', {
            'fields': ('user', 'title', 'description')
        }),
        ('Event Details', {
            'fields': ('expected_start_date', 'expected_end_date', 'location', 'expected_guests')
        }),
        ('Budget', {
            'fields': ('budget',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )