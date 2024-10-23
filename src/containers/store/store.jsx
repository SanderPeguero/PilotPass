import React from 'react'
import styles from './store.module.css'

function store() {
  return (
    <div className={`ml-[6rem] ${styles.grid}`}>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
    </div>
  )
}

function Product(){
    return(
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src="https://images.unsplash.com/photo-1674658556545-f18d4080ab6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>  
    )
}

export default store