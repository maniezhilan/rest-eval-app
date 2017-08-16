from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn
from app.questions.models import Questions, QuestionsSchema


class Surveys(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    active = db.Column(db.Integer, nullable=False)
    creation_time = db.Column(
        db.TIMESTAMP, server_default=db.func.current_timestamp())
    modification_time = db.Column(
        db.TIMESTAMP, server_default=db.func.current_timestamp())
    # Relationships
    questions = db.relationship('Questions', backref='surveys',
                                lazy='dynamic')

    def __init__(self,  title,  description,  active,  creation_time,  modification_time,  question, ):

        self.title = title
        self.description = description
        self.active = active
        self.creation_time = creation_time
        self.modification_time = modification_time
        self.question = question


class SurveysSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    # add validate=not_blank in required fields
    id = fields.Integer(dump_only=True)

    title = fields.String(validate=not_blank)
    description = fields.String(validate=not_blank)
    active = fields.Integer(required=True)
    #If the field is a collection of nested objects, you must set many=True.
    #http://marshmallow.readthedocs.io/en/latest/nesting.html#nesting
    questions = fields.Nested(QuestionsSchema, many=True)


    # self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/surveys/"
        else:
            self_link = "/surveys/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'surveys'
