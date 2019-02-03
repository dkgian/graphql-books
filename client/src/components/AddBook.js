import React from "react"
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getAuthorsQuery = gql`
{
  authors{
      id
      name
  }
}
`

function AddBookForm({
  data: {
    loading,
    authors,
  }
}) {
  return (
   <form>
     <div className="form-group">
       <label>
         Book name:
         <input
           name="bookName"
           type="text"
         />
       </label>
     </div>

     <div className="form-group">
       <label>
         Genre:
         <input
           name="genre"
           type="text"
         />
       </label>
     </div>

     <div className="form-group">
       <label>
         Author:
         <select>
           { loading ? <option>Loading...</option>
            :
             authors.map(({id, name}) => (
               <option key={id}>{name}</option>
             ))
           }
         </select>
       </label>
     </div>
   </form>
  )
}

export default graphql(getAuthorsQuery)(AddBookForm)
