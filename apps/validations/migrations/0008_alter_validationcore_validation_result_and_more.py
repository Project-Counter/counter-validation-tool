# Generated by Django 5.1.2 on 2024-12-02 14:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("validations", "0007_alter_counterapivalidation_requested_begin_date_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="validationcore",
            name="validation_result",
            field=models.PositiveSmallIntegerField(
                choices=[
                    (0, "Unknown"),
                    (10, "Passed"),
                    (20, "Notice"),
                    (30, "Warning"),
                    (40, "Error"),
                    (50, "Critical error"),
                    (60, "Fatal error"),
                ],
                default=0,
                help_text="The worst result of all the results in the validation",
            ),
        ),
        migrations.AlterField(
            model_name="validationmessage",
            name="severity",
            field=models.PositiveSmallIntegerField(
                choices=[
                    (0, "Unknown"),
                    (10, "Passed"),
                    (20, "Notice"),
                    (30, "Warning"),
                    (40, "Error"),
                    (50, "Critical error"),
                    (60, "Fatal error"),
                ]
            ),
        ),
    ]
