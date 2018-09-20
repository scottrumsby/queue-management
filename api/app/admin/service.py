'''Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.'''


from app.models import Service
from flask_admin.contrib.sqla import ModelView
from qsystem import db


class ServiceConfig(ModelView):
    create_modal = True
    edit_modal = True
    can_delete = False
    column_list = [
        'service_code',
        'service_name',
        'service_desc',
        'parent',
        'actual_service_ind',
        'display_dashboard_ind',
        'prefix',
        'deleted'
    ]
    column_labels = {
        'service_desc': 'Description',
        'deleted': 'Deleted'
    }
    column_sortable_list = [
        'service_code',
        'service_name',
        'parent',
        'prefix',
        'actual_service_ind',
        'display_dashboard_ind',
        'deleted'
    ]
    column_default_sort = 'service_name'
    form_args = {
        'actual_service_ind': {'default': '1'},
        'display_dashboard_ind': {'default': '1'}
    }
    form_create_rules = (
        'service_code',
        'service_name',
        'service_desc',
        'parent',
        'actual_service_ind',
        'display_dashboard_ind',
        'prefix'
    )


ServiceModelView = ServiceConfig(Service, db.session)
