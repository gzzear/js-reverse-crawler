from peewee import *

db = MySQLDatabase("spider", host="121.40.211.118", port=3306, user="root", password="Hssm#2025")

class BaseModel(Model):
    class Meta:
        database = db

#设计数据表的时候有几个重要点一定要注意
"""
char类型， 要设置最大长度
对于无法确定最大长度的字段，可以设置为Text
设计表的时候 采集到的数据要尽量先做格式化处理
default和null=True
"""


class PhoneItem(BaseModel):
    id = BigAutoField(primary_key=True)
    title = CharField()
    price = CharField()
    info = CharField()


if __name__ == "__main__":
    db.create_tables([PhoneItem])
