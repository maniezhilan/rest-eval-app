from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn


class Questions(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(250), nullable=False)
    survey_id = db.Column(db.Integer(), db.ForeignKey('surveys.id', ondelete='CASCADE'))
    order = db.Column(db.Integer())
    creation_time = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated = db.Column(db.DateTime, default=db.func.current_timestamp(),
                            onupdate=db.func.current_timestamp())

    def __init__(self,  name, ):

        self.name = name


class QuestionsSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    # add validate=not_blank in required fields
    id = fields.Integer(dump_only=True)

    name = fields.String(validate=not_blank)

    # self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/questions/"
        else:
            self_link = "/questions/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'questions'
