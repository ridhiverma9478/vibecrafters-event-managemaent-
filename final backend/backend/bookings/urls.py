from django.urls import path
from bookings import views

urlpatterns = [
    path('create_booking/', views.create_booking, name='create_booking'),
    path('get_booking_detail/', views.get_booking_detail, name='get_booking_detail'),
    path('send_ticket_api/', views.send_ticket_api, name='send_ticket_api'),
    path('verify_ticket/', views.verify_ticket, name='verify_ticket'),
    path('get_tickets_by_user/', views.get_tickets_by_user, name='get_tickets_by_user'),
]