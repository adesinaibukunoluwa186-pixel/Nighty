from django.shortcuts import render
from rest_framework.views import APIView
from .models import React, Category, Comment, Profile, Bookmark, Newsletter
from .serializer import ReactSerializer, CategorySerializer, CommentSerializer, RegisterSerializer, ProfileSerializer, BookmarkSerializer, NewsletterSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated



class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


        
        

class ReactView(generics.ListCreateAPIView):
    serializer_class = ReactSerializer

    def get_queryset(self):
        queryset = React.objects.all()

        category = self.request.GET.get("category")

        if category:
            queryset = queryset.filter(
                category__name__iexact=category
            )

        return queryset

class MostViewedPostsView(generics.ListAPIView):
    serializer_class = ReactSerializer

    def get_queryset(self):
        return React.objects.order_by("-views")[:5]
        

class ReactDetailView(generics.RetrieveAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer
    lookup_field = "slug"

    def retrieve(self, request, *args, **kwargs):
        react = self.get_object()

        print("BEFORE:", react.views)

        react.views += 1
        react.save(update_fields=["views"])

        print("AFTER:", react.views)

        serializer = self.get_serializer(react)

        return Response(serializer.data)
        
        



class NewsletterView(generics.ListCreateAPIView):

    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer

class LikePostView(APIView):
    def post(self, request, pk):
        try:
            react = React.objects.get(pk=pk)
            react.likes += 1
            react.save(update_fields=["likes"])

            return Response(
                {"likes": react.likes},
                status=status.HTTP_200_OK
            )
        except React.DoesNotExist:
            return Response(
                {"error": "Post not found"},
                status=status.HTTP_404_NOT_FOUND
            )


        

class CommentListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(
            post_id=self.kwargs["post_id"],
            parent=None
        ).order_by("-created_at")
        





class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    

class ProfileDetailView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    

class BookmarkView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(
            user=self.request.user
        )

    def get_serializer_class(self):
        if self.request.method == "POST":
            return BookmarkCreateSerializer
        return BookmarkSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
def perform_create(self, serializer):
    post = serializer.validated_data["post"]

    if Bookmark.objects.filter(
        user=self.request.user,
        post=post
    ).exists():
        return

    serializer.save(user=self.request.user)
    
class RemoveBookmarkView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):

        Bookmark.objects.filter(
            user=request.user,
            post_id=post_id
        ).delete()

        return Response({
            "message": "Bookmark removed"
        })
        
        
        
    

class RemoveBookmarkView(generics.DestroyAPIView):
    queryset = Bookmark.objects.all()