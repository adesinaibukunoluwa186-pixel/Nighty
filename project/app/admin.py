from django.contrib import admin
from .models import React, Category, Comment, Profile, Newsletter



admin.site.register(Profile)
admin.site.register(React)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Newsletter)