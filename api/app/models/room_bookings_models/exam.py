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

from qsystem import db
from api.app.models.room_bookings_models import Base

class Exam(Base):

    exam_id             = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    event_id            = db.Column(db.Integer, nullable=False)
    exam_name           = db.Column(db.String(50), nullable=False)
    examinee_name       = db.Column(db.String(50), nullable=False)
    expiry_date         = db.Column(db.DateTime, nullable=False)
    notes               = db.Column(db.String(400), nullable=True)
    exam_received       = db.Column(db.Boolean, nullable=False)
    session_number      = db.Column(db.Integer, nullable=False)
    number_of_students  = db.Column(db.Integer, nullable=False)
    exam_method         = db.Column(db.Enum, nullable=False)
    exam_type_id        = db.Column(db.Integer, db.ForeignKey('exam_type.exam_type_id'), nullable=False)
    invigilator_id      = db.Column(db.Integer, db.ForeignKey('invigilator.invigilator_id'), nullable=False)
    office_id           = db.Column(db.Integer, db.ForeignKey('office.office_id'), nullable=False)
    room_id             = db.Column(db.Integer, db.ForeignKey('room.room_id'), nullable=False)

    def __repr__(self):
        return ;'<Exam Name: (name={self.exam_name!r})>'.format(self=self)

    def __int__(self, **kwargs):
        super(Exam, self).__init__(**kwargs)