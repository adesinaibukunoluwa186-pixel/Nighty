from rest_framework import serializers
from .models import React, Category, Comment, Profile, Bookmark, Newsletter
from django.contrib.auth.models import User
from rest_framework import serializers




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ReactSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    author = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = React
        fields = "__all__"


class NewsletterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Newsletter
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"
        extra_kwargs = {
            "post": {"read_only": True},
        }

    def get_replies(self, obj):
        return CommentSerializer(obj.replies.all(), many=True).data
        

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user
        
        

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Profile
        fields = "__all__"


class BookmarkSerializer(serializers.ModelSerializer):
    post = ReactSerializer(read_only=True)

    class Meta:
        model = Bookmark
        fields = "__all__"

class BookmarkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ["post"]