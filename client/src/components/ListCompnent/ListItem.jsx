import React, { useState } from 'react'
import { BiRupee } from 'react-icons/bi'
import './ListComp.css'
import {timeSince} from '../../actions/timeSince'
import EditExpense from '../EditExpense/EditExpense'
import { useLongPress } from "@uidotdev/usehooks";


function ListItem({IconComponent, className, category, desc,date, amount, balance, month, _id, edit=true}) 
{   const [editOpen, setEditOpen]= useState(false)
   const [editingItem, setEditingItem]= useState(null)
   const longPressAttrs = useLongPress(
    () => {
        if(edit){
            setEditingItem({description:desc, category, amount, _id})
            setEditOpen(true);
        }
    },{})
    const uploadTime=new Date(date)
    return (
        <>
            <div className="list-item" style={{borderBottom:"1px solid #8080802b"}}
            {...longPressAttrs}>
                        <div className="list-logo">
                        <IconComponent className={className} />
                        </div>
                        <div className="list-desc">
                            {
                                month ? 
                            <b className="list-item-name">{month}</b> :
                            <b className="list-item-name">{category}</b>
                            }
                            {desc && <span className="list-item-brief">{desc}</span>}
                        </div>
                        <div className="list-amount-details">
                        <div className={`list-item-amount ${amount<0 && "credit"}`}>
                                <b>{amount<0 ? "+" : "-"}</b>
                                <BiRupee/><b>{Math.abs(amount)}</b></div>
                            {date && <span className="list-item-date">
                                { timeSince(uploadTime) }
                            </span>}
                            {balance && <span className="list-item-date">
                                { balance }
                            </span>}
                        </div>
            </div>
            {
                editOpen && <EditExpense setOpen={setEditOpen} expenseData={editingItem}/>
            }
        </>
    )
}

export default ListItem