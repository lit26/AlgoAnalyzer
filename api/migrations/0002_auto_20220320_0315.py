# Generated by Django 3.1.6 on 2022-03-20 03:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="stockdata",
            name="last_used",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
