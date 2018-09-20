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


from app.models import Office
from flask_admin.contrib.sqla import ModelView
from qsystem import db


class OfficeConfig(ModelView):
    create_modal = True
    edit_modal = True
    can_delete = False
    column_list = ['office_name', 'sb', 'deleted']
    form_create_rules = ('office_name', 'sb')
    form_edit_rules = ('office_name', 'sb', 'deleted')
    column_labels = {'sb': 'Smartboard'}
    column_sortable_list = ['office_name', 'sb', 'deleted']
    column_default_sort = 'office_name'


OfficeModelView = OfficeConfig(Office, db.session)
