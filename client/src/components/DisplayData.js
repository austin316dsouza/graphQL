import React, { useState } from 'react'
import {useQuery, useLazyQuery , gql} from "@apollo/client";

const QUERY_ITEMS = gql`
    query GetItems{
        items {
            id
            name
            price
            category
        }
    }
`;

const QUERY_REQS = gql`
    query GetReqs{
        requirements {
            id
            name
            qualityGrade
        }
    }
`

const GET_ITEM = gql`
    query GetItem($itemId : ID!) {
        item(id: $itemId){
            id
            name
        }
    }
`


function DisplayData() {
    
    const [itemSearched, setItemSearched] = useState("")

    const {data, loading, error} = useQuery(QUERY_ITEMS);
    const {data:reqData} = useQuery(QUERY_REQS);
    const [fetchItem, {data:searchData}] = useLazyQuery(GET_ITEM);

    if(loading){
        return <h1>LOADING ...</h1>
    }

  return (
    <>
        {data && data.items.map((item)=>{
            return <div>
                <h1>Item name : {item.name}</h1>
                <h2>price : {item.price}</h2>
                <h2>category : {item.category}</h2>
                <h1>__________________</h1>
            </div>
        })}

        {reqData && reqData.requirements.map((req)=>{
            return <div>
                <h1>Requirement name : {req.name}</h1>
                <h2>qualityGrade : {req.qualityGrade}</h2>
            </div>
        })}

        <div>
            <input type="number" placeholder='1' onChange={(event)=> {setItemSearched(event.target.value)}}/>
            <button onClick={()=> {
                fetchItem({variables: {
                    itemId: Number(itemSearched)
                }})
            }}>Fetch Item</button>
            <div>
                {searchData && 
                    <h1>NAME OF ITEM : {searchData.item.name}</h1>
                }
            </div>
        </div>
    </>    
    
  )
}

export default DisplayData