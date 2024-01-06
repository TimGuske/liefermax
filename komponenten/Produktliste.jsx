import {Card, Button} from 'react-bootstrap';
import Link from 'next/link';
import { addProdukte } from '../redux/warenkorbSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../redux/infoSlice';
import { v4 as uuidv4 } from 'uuid';

export default function ProduktListe({ produkte }) {

    const dispatch = useDispatch();
    const _id = uuidv4();
    const zumWarenkorb = (produkt) =>{
        console.log('Dispatcher aufgerufen für', produkt);
        
        //const prod = produkte[0];
        //prod.preis = 99;
        //prod.menge = 4;
        dispatch(addProdukte({...produkt, menge:1, extras:[], _id}));
        dispatch(setName('Tim'));
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
                            <Button variant="danger" onClick={() => zumWarenkorb(produkt)}>zum Warenkorb</Button> 
                        </Card.Body>
                    </Card>
                </div>    
            ))}
        </div>
        <br></br>
    </div>
  )
}
