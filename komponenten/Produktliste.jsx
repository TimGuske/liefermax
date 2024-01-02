import {Card, Button} from 'react-bootstrap'
import Link from 'next/link'
import { addProdukte } from '../redux/warenkorbSlice';
import { useDispatch, useSelector } from 'react-redux'

export default function ProduktListe({ produkte }) {

    const dispatch = useDispatch()

    const zumWarenkorb = () =>{
        console.log('Dispatcher aufgerufen');
        dispatch(addProdukte({...produkte[0], extras:[{_id:2, text:'leck mich', preis:3}], preis:33, menge:33, seggel:'Tim'}));
    }

    console.log('Seite aufgerufen');

  return (
    <div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            {produkte?.map((produkt) =>(
                <div key={produkt._id} className="mt-3 col">
                    <Card>
                        <Link href={`/produkte/${produkt.url}`} passHref>
                            <Card.Img variant="top" src={produkt.bild} />
                        </Link>
                        <Card.Body>
                            <Card.Title>
                                {produkt.name} {produkt.preis}€
                            </Card.Title>
                            <Card.Text>
                                {produkt.beschreibung}
                            </Card.Text>
                            <Button variant="danger" onClick={zumWarenkorb}>zum Warenkorb</Button> 
                        </Card.Body>
                    </Card>
                </div>    
            ))}
        </div>
        <br></br>
    </div>
  )
}
