import React from 'react'
import { HiCollection } from 'react-icons/hi'
import { IoFastFood } from 'react-icons/io5'
import { FaCartArrowDown, FaMoneyBillWave } from 'react-icons/fa'
import { RiTaxiFill } from 'react-icons/ri'
import './ListComp.css'
import ListItem from './ListItem'
import { FcClapperboard, FcDepartment, FcMoneyTransfer, FcOk, FcPlanner, FcPlus } from 'react-icons/fc'
function ListComp({ list, edit }) {
    console.log(window.location)
    var Components = {
        entertainment: {
            icon: FcClapperboard,
            className: "list-category-icon entertainment"
        },
        rent: {
            icon: FaMoneyBillWave,
            className: "list-category-icon rent"
        },
        food: {
            icon: IoFastFood,
            className: "list-category-icon food"
        },
        transport: {
            icon: RiTaxiFill,
            className: "list-category-icon transport"
        },
        emi: {
            icon: FcPlanner,
            className: "list-category-icon emi"
        },
        shopping: {
            icon: FaCartArrowDown,
            className: "list-category-icon shopping"
        },
        hospital: {
            icon: FcPlus,
            className: "list-category-icon hospital"
        },
        school: {
            icon: FcDepartment,
            className: "list-category-icon school"
        },
        fees: {
            icon: FcMoneyTransfer,
            className: "list-category-icon fees"
        },
        spent: {
            icon: FcMoneyTransfer,
            className: "list-category-icon fees"
        },
        savings: {
            icon: FcOk,
            className: "list-category-icon fees"
        },
        other: {
            icon: HiCollection,
            className: "list-category-icon other"
        },
    }

    return (
        <div className="list-container">

            <div className="list-items">
                {
                    list.map((item, index) => {
                        return < div key={index}>
                            <div style={{marginBottom:"10px"}}>
                                {item.newDate &&
                                    <label className='caption'>{item.date}{" "}
                                    </label>}
                                {(index === 0 && window.location.pathname!=="/analysis") ? <i style={{ fontSize: ".8rem", opacity: "30%"}}> (touch and hold to update)</i> : null}
                            </div>
                            <ListItem
                                edit={edit}
                                IconComponent={Components[item.category].icon}
                                className={Components[item.category].className}
                                amount={item.amount}
                                desc={item.description}
                                date={item.createdAt}
                                category={item.category}
                                balance={item.balance}
                                month={item.month}
                                _id={item._id}
                            />
                        </div>
                    })

                }
            </div>
        </div>
    )
}

export default ListComp