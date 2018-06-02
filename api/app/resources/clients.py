from flask import request, jsonify, g
from flask_restplus import Resource, abort
import sqlalchemy.orm
from qsystem import api, db, oidc, socketio

from app.models import Client

from cockroachdb.sqlalchemy import run_transaction

import logging

@api.route("/clients/")
class ClientList(Resource):

    @api.marshal_with(Client.model)
    @oidc.accept_token(require_token=True)
    def get(self):
        #clients = Client.query.filter_by(office_id=current_user.office_id).all()
        clients = Client.query.all()
        return clients, 200

    def post(self):
        json_input = request.get_json()
        name = json_input.get('name', None)

        if name == None:
            return {"message": "name is required"}, 400

        #client = Client(name=name, office_id=current_user.office_id)
        client = Client(name=name)
        sessionmaker = sqlalchemy.orm.sessionmaker(db.engine)
        run_transaction(sessionmaker, client.save_to_db)

        #socketio.emit('update_customer_list', {"data": "test"}, room=current_user.office_id)
        socketio.emit('update_customer_list', {"data": "test"})
        return client, 201

@api.route("/clients/<int:id>/")
class ClientDetail(Resource):
    
    @api.marshal_with(Client.model)
    def get(self, id):
        #client = Client.query.filter_by(id=id, office_id=current_user.office_id).first_or_404()
        client = Client.query.filter_by(id=id).first_or_404()

        #emit('update_customer_list', {}, room="{office}".format(office=current_user.office_id))
        emit('update_customer_list', {})
        return client, 200

    def delete(self, id):
        #Client.query.filter_by(id=id, office_id=current_user.office_id).delete()
        Client.query.filter_by(id=id).delete()
        db.session.commit()

        #socketio.emit('update_customer_list', {"data": "test"}, room=current_user.office_id)
        socketio.emit('update_customer_list', {"data": "test"})
        return '', 204
