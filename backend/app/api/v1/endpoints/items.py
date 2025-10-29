from fastapi import APIRouter, HTTPException
from typing import List
from ..schemas.item import Item, ItemCreate
from ..crud.item import get_items, create_item, get_item

router = APIRouter()

@router.get("/", response_model=List[Item])
async def read_items(skip: int = 0, limit: int = 10):
    items = await get_items(skip=skip, limit=limit)
    return items

@router.post("/", response_model=Item)
async def create_new_item(item: ItemCreate):
    return await create_item(item)

@router.get("/{item_id}", response_model=Item)
async def read_item(item_id: int):
    item = await get_item(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item