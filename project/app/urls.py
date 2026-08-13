from django.urls import path
from .views import (
    ReactView,
    ReactDetailView,
    CategoryListView,
    LikePostView,
    CommentListView,
    RegisterView,
    ProfileDetailView,
    BookmarkView,
    RemoveBookmarkView,
    NewsletterView,
    MostViewedPostsView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    # Static/specific post URLs FIRST
    path(
        "posts/most-viewed/",
        MostViewedPostsView.as_view(),
        name="most-viewed-posts"
    ),

    path(
        "posts/<int:pk>/like/",
        LikePostView.as_view(),
        name="like-post"
    ),

    path(
        "posts/<int:post_id>/comments/",
        CommentListView.as_view(),
        name="comments"
    ),

    # Post list
    path(
        "posts/",
        ReactView.as_view(),
        name="post-list"
    ),

    # Dynamic slug URL LAST
    path(
        "posts/<slug:slug>/",
        ReactDetailView.as_view(),
        name="post-detail"
    ),

    path(
        "categories/",
        CategoryListView.as_view(),
        name="category-list"
    ),

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "newsletter/",
        NewsletterView.as_view(),
        name="newsletter"
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
        "profiles/<int:pk>/",
        ProfileDetailView.as_view(),
        name="profile-detail"
    ),

    path(
        "bookmarks/",
        BookmarkView.as_view(),
        name="bookmarks"
    ),

    path(
        "bookmarks/<int:post_id>/",
        RemoveBookmarkView.as_view(),
        name="remove-bookmark"
    ),
]