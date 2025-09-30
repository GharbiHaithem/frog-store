import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchproduct } from '../../features/product/productSlice'

const SearchComponent = ({openSearch,setOpenSearch}) => {
      const [search, setSearch] = useState(null)
      const navigate= useNavigate()
      const dispatch= useDispatch()
      const handleChange = (e) => {
            setSearch(e.target.value)

      }
      useEffect(()=>{
            if(search !== null){
              dispatch(searchproduct({titre:search}))
            }
           
          },[search,dispatch])
     
      const{productsearched}=useSelector(state=>state?.product)
      return (
            <div className='fixed z-[1000] w-full h-full bg-[#ff0c0caf] flex items-start justify-center'>
                  <div className='relative w-[400px]'>
                        <input type='text' name='titre' onChange={handleChange} value={search} placeholder='Recherche' className='w-full p-2 outline-none' />
                        {productsearched && productsearched?.length>0 && search?.length>0 && <span className='absolute w-full z-[1000] h-[200px] overflow-y-scroll top-10 left-0 bg-gray-50 p-2'>
     {productsearched && productsearched?.map((data)=>(
 <div key={data?._id} onClick={()=>{navigate(`/singleProduct/${data?._id}`)
 setSearch('')
 setOpenSearch(!openSearch)  
 }} className='flex items-center '>
 <img  src={data?.images_product[0]?.url} className='w-[70px] h-[70px] object-cover' />
 <p>{data?.titre}</p>
</div>
     ))}
       </span>}
                  </div>
                  
            </div>
      )
}

export default SearchComponent