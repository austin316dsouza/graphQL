import React, { useState } from 'react'
import {useQuery, useLazyQuery , gql, useMutation} from "@apollo/client";

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
const CREATE_ITEM = gql`
    mutation CreateItem($input : CreateItemInput!){
        createItem(input: $input){
            id
            name
            category
        }
    }   
`
const UPDATE_ITEM = gql`
    mutation UpdateItem($input : CreateUpdateItemname!){
        updateItemname(input : $input){
            id
            name
            price
            category
        }
    }
`
const DELETE_ITEM = gql`
    mutation DeleteItem($id:ID!){
        deleteItem(id:$id){
            id
        }
    }
`
function DisplayData() {
    //search item state
    const [itemSearched, setItemSearched] = useState("")
    //create Item states
    const [name,setName] = useState("")
    const [price,setPrice] = useState(0)
    const [category,setCategory] = useState("")
    //update Item state
    const [id,setId] = useState(0)
    const [newName,setNewName] = useState("")
    //delete item state
    const [deleteId,setDeleteId] = useState(0)

    //apollo hooks
    const {data, loading, error, refetch} = useQuery(QUERY_ITEMS);
    const {data:reqData} = useQuery(QUERY_REQS);
    const [fetchItem, {data:searchData}] = useLazyQuery(GET_ITEM);
    const [createItem] = useMutation(CREATE_ITEM);
    const [updateItem] = useMutation(UPDATE_ITEM);
    const [deleteItem, {data:deleteData}] = useMutation(DELETE_ITEM);

    if(loading){
        return <h1>LOADING ...</h1>
    }

  return (
    <>  
        <div>
            <input type="text" placeholder='Item name' onChange={(event)=>{setName(event.target.value)}}/>
            <input type="number" placeholder='price' onChange={(event)=>{setPrice(event.target.value)}}/>
            <input type="text" placeholder='category' onChange={(event)=>{setCategory(event.target.value.toUpperCase())}}/>
            <button onClick={()=>{createItem({variables:{input: {name,price:Number(price),category}}})
                refetch();    
            }}>Create Item</button>
        </div> <br></br>
        <div>
            <input type="number" placeholder='Item ID' onChange={(event)=> {setItemSearched(event.target.value)}}/>
            <button onClick={()=> {fetchItem({variables: {itemId: Number(itemSearched)}})
            }}>Search Item</button>
            <div>
                {searchData && 
                    <h1>NAME OF ITEM : {searchData.item.name}</h1>
                }
            </div>
        </div><br></br>
        <div>
            <input type="number" placeholder='ID' onChange={(event)=>{setId(event.target.value)}}/>
            <input type="text" placeholder='New Name' onChange={(event)=>{setNewName(event.target.value)}}/>
            <button onClick={()=>{updateItem({variables:{input: {id:Number(id),newName}}})
                refetch();    
            }}>Update Item</button>
        </div> <br></br>
        <div>
            <input type="number" placeholder='ID' onChange={(event)=>{setDeleteId(event.target.value)}}/>
            <button onClick={()=>{deleteItem({variables:{id:Number(deleteId)}})
                refetch();
            }}>Delete</button>
            <div>
                {deleteData &&
                    <h1>ITEM DELETED</h1>
                }
            </div>
        </div>
        {data && data.items.map((item)=>{
            return <div>
                <h1>Item name : {item.name}</h1>
                <h2>ID : {item.id}</h2>
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

        
    </>    
    
  )
}

export default DisplayData