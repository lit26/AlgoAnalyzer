# Generated by Django 3.1.6 on 2022-03-21 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="savedstrategy",
            name="name",
            field=models.CharField(default="Unnamed", max_length=100),
        ),
    ]
