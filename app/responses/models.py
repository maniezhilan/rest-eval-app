from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn


class Responses(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer(), db.ForeignKey('questions.id', ondelete='CASCADE'))
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id', ondelete='CASCADE'))
    answer = db.Column(db.String(200))
    modification_time = db.Column(
        db.TIMESTAMP, server_default=db.func.current_timestamp())

    def __init__(self,  user,  answer,  question,  modification_time, ):

        self.user = user
        self.answer = answer
        self.question = question
        self.modification_time = modification_time


class ResponsesSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    # add validate=not_blank in required fields
    id = fields.Integer(dump_only=True)

    user = fields.String(validate=not_blank)
    answer = fields.String(validate=not_blank)
    question = fields.String(validate=not_blank)


    # self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/responses/"
        else:
            self_link = "/responses/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'responses'
