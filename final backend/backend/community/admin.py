from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.utils.html import format_html
from .models import Post, Comment, Reply, Like, Report, SavedPost

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    fields = ('user', 'content', 'created_at')
    readonly_fields = ('created_at',)
    show_change_link = True

class ReplyInline(admin.TabularInline):
    model = Reply
    extra = 0
    fields = ('user', 'content', 'created_at')
    readonly_fields = ('created_at',)
    show_change_link = True

class LikeInline(admin.TabularInline):
    model = Like
    extra = 0
    fields = ('user', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'image_preview', 'created_at', 'comment_count', 'like_count')
    list_filter = ('created_at', 'user')
    search_fields = ('title', 'content', 'user__email')
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    fieldsets = (
        ('Post Information', {
            'fields': ('user', 'title', 'content')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    inlines = [CommentInline, LikeInline]
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="150" />', obj.image.url)
        return "-"
    image_preview.short_description = 'Preview'
    
    def comment_count(self, obj):
        return obj.comments.count()
    comment_count.short_description = 'Comments'
    
    def like_count(self, obj):
        return obj.likes.count()
    like_count.short_description = 'Likes'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content_preview', 'user', 'post', 'created_at', 'reply_count')
    list_filter = ('created_at', 'user')
    search_fields = ('content', 'user__email', 'post__title')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Comment Information', {
            'fields': ('user', 'post', 'content')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    inlines = [ReplyInline]
    
    def content_preview(self, obj):
        return f"{obj.content[:50]}..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'
    
    def reply_count(self, obj):
        return obj.replies.count()
    reply_count.short_description = 'Replies'

@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ('content_preview', 'user', 'comment_link', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('content', 'user__email', 'comment__content')
    readonly_fields = ('created_at',)
    
    def content_preview(self, obj):
        return f"{obj.content[:50]}..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'
    
    def comment_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        url = reverse('admin:social_comment_change', args=[obj.comment.id])
        return format_html('<a href="{}">{}</a>', url, f"Comment #{obj.comment.id}")
    comment_link.short_description = 'Comment'

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'post_link', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('user__email', 'post__title')
    readonly_fields = ('created_at',)
    
    def post_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        url = reverse('admin:social_post_change', args=[obj.post.id])
        return format_html('<a href="{}">{}</a>', url, obj.post.title)
    post_link.short_description = 'Post'

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('user', 'reported_content', 'reason', 'reported_at')
    list_filter = ('reason', 'reported_at')
    search_fields = ('user__email', 'post__title', 'comment__content', 'description')
    readonly_fields = ('reported_at', 'content_preview')
    fieldsets = (
        ('Report Information', {
            'fields': ('user', 'reason', 'description')
        }),
        ('Reported Content', {
            'fields': ('post', 'comment', 'content_preview')
        }),
        ('Metadata', {
            'fields': ('reported_at',),
            'classes': ('collapse',)
        }),
    )
    
    def reported_content(self, obj):
        if obj.post:
            return f"Post: {obj.post.title[:50]}"
        elif obj.comment:
            return f"Comment: {obj.comment.content[:50]}"
        return "-"
    reported_content.short_description = 'Reported Content'
    
    def content_preview(self, obj):
        if obj.post:
            return f"Post: {obj.post.title}\n{obj.post.content[:100]}..."
        elif obj.comment:
            return f"Comment: {obj.comment.content[:100]}..."
        return "-"
    content_preview.short_description = 'Content Preview'

@admin.register(SavedPost)
class SavedPostAdmin(admin.ModelAdmin):
    list_display = ('user', 'post_link', 'saved_at')
    list_filter = ('saved_at', 'user')
    search_fields = ('user__email', 'post__title')
    readonly_fields = ('saved_at',)
    
    def post_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        url = reverse('admin:social_post_change', args=[obj.post.id])
        return format_html('<a href="{}">{}</a>', url, obj.post.title)
    post_link.short_description = 'Post'