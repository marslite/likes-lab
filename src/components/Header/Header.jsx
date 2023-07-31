import { Header, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';




export default function PageHeader(){
    return (
        <Segment>
            <Header as='h2' style={{display:'flex', justifyContent: 'space-around'}} >
            <Link className='l1' to='/'>🏡Home</Link>
              <Link className='l2' to='/hayk'> 🗿Profile</Link>
              <Link className='l3' to='/logout'> 📴 Logout</Link>
            </Header>
        </Segment>
    )
}