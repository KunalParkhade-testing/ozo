"""A minimal script template for Alembic revisions.
You can keep the default generated template or run `alembic revision --autogenerate -m "msg"` to produce migration scripts.
"""
% from alembic import op
% from sqlalchemy import *

revision = '${up_revision}'
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}

def upgrade():
    pass


def downgrade():
    pass
