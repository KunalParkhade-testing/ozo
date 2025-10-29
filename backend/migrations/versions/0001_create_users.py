"""create users table

Revision ID: 0001_create_users
Revises: 
Create Date: 2025-10-29 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_create_users'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('username', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('email', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('full_name', sa.String(), nullable=True),
        sa.Column('hashed_password', sa.String(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('users')
