import React, { Fragment } from "react"
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
         <select name="author">
           { loading ? <option>Loading...</option>
            :
             <Fragment>
               <option>Select author...</option>
               {
                 authors.map(({id, name}) => (
                   <option
                     name={name}
                     key={id}
                   >
                     {name}
                   </option>
                 ))
               }
             </Fragment>
           }
         </select>
       </label>
     </div>
   </form>
  )
}

export default graphql(getAuthorsQuery)(AddBookForm)
