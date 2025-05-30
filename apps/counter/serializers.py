from rest_framework import serializers

import counter.models


class SushiServiceSerializer(serializers.ModelSerializer):
    deprecated = serializers.ReadOnlyField()

    class Meta:
        model = counter.models.SushiService
        fields = (
            "id",
            "counter_release",
            "url",
            "ip_address_authorization",
            "api_key_required",
            "platform_attr_required",
            "requestor_id_required",
            "deprecated",
        )


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = counter.models.Report
        fields = (
            "counter_release",
            "report_id",
        )


class PlatformSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = counter.models.Platform
        fields = (
            "id",
            "name",
            "abbrev",
            "deprecated",
        )


class PlatformSerializer(serializers.ModelSerializer):
    reports = ReportSerializer(many=True, read_only=True)
    sushi_services = SushiServiceSerializer(many=True, read_only=True)
    deprecated = serializers.ReadOnlyField()

    class Meta:
        model = counter.models.Platform
        fields = (
            "id",
            "name",
            "abbrev",
            "reports",
            "content_provider_name",
            "website",
            "sushi_services",
            "deprecated",
        )


class PlatformCreateSerializer(serializers.ModelSerializer):
    """
    Used for syncing data from the registry, so the structure matches the registry API
    """

    reports = ReportSerializer(many=True, read_only=True)
    sushi_services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = counter.models.Platform
        fields = (
            "id",
            "name",
            "abbrev",
            "reports",
            "content_provider_name",
            "website",
            "sushi_services",
        )
