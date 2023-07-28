import { Header, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default function PageHeader(){
    return (
        <Segment>
            <Header as='h2' >
            <Link to='/'>🏡Home</Link>
              ~~~~~~~~~~~~~~~
              <Link to='/hayk'>🗿Profile</Link>
            </Header>
        </Segment>
    )
}