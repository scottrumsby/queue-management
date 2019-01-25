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

import logging
from flask import g, request
from flask_restplus import Resource
from sqlalchemy import exc
from app.models.bookings import Exam, Booking
from app.models.theq import CSR
from app.schemas.bookings import ExamSchema
from qsystem import api, oidc
from datetime import datetime, timedelta
import pytz


@api.route("/exams/export/", methods=["GET"])
class ExamList(Resource):

    exam_schema = ExamSchema(many=True)

    timezone = pytz.timezone("US/Pacific")

    @oidc.accept_token(require_token=True)
    def get(self):
        try:
            csr = CSR.find_by_username(g.oidc_token_info['username'])

            start_param = request.args.get("start_date")
            end_param = request.args.get("end_date")

            if not(start_param and end_param):

                return {"message": "Must provide both start and end time"}, 422

            try:
                start_date = datetime.strptime(request.args['start_date'], "%Y-%m-%d")
                end_date = datetime.strptime(request.args['end_date'], "%Y-%m-%d")

            except ValueError as err:
                print(err)
                return {"message", "Unable to return date time string"}, 422

            start_date = self.timezone.localize(start_date)

            end_date += timedelta(days=1)

            end_date = self.timezone.localize(end_date)

            exams = Exam.query.filter_by(office_id=csr.office_id)\
                              .join(Booking, Exam.booking_id == Booking.booking_id)\
                              .filter(Booking.start_time >= start_date)\
                              .filter(Booking.start_time < end_date)

            result = self.exam_schema.dump(exams)

            return {'exams': result.data,
                    'errors': result.errors}, 200

        except exc.SQLAlchemyError as error:
            logging.error(error, exc_info=True)
            return {"message": "api is down"}, 500