# Generated by Django 3.2.8 on 2021-11-26 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Polyclinic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('polyclinicType', models.CharField(choices=[('ЖЕНСКАЯ КОНСУЛЬТАЦИЯ', 'ЖЕНСКАЯ КОНСУЛЬТАЦИЯ'), ('ГОРОДСКАЯ ПОЛИКЛИНИКА', 'ГОРОДСКАЯ ПОЛИКЛИНИКА'), ('КЛИНИЧЕСКИЙ ЦЕНТР', 'КЛИНИЧЕСКИЙ ЦЕНТР'), ('МЕДИЦИНСКИЙ ЦЕНТР', 'МЕДИЦИНСКИЙ ЦЕНТР')], max_length=200)),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=20)),
                ('metro', models.CharField(max_length=50)),
            ],
        ),
    ]
