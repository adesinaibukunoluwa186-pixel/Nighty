from django.db import migrations
from django.utils.text import slugify


def generate_slugs(apps, schema_editor):
    React = apps.get_model("app", "React")

    used_slugs = set()

    for post in React.objects.all().order_by("id"):
        base_slug = slugify(post.title)

        if not base_slug:
            base_slug = f"post-{post.id}"

        slug = base_slug[:240]
        counter = 1

        while slug in used_slugs:
            slug = f"{base_slug[:240]}-{post.id}-{counter}"
            counter += 1

        used_slugs.add(slug)

        post.slug = slug
        post.save(update_fields=["slug"])


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0016_react_slug"),
    ]

    operations = [
        migrations.RunPython(
            generate_slugs,
            migrations.RunPython.noop,
        ),
    ]
