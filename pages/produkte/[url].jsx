import Link from 'next/link'
import Image from 'next/image'
import { ListGroup, Button, ListGroupItem } from 'react-bootstrap';
import mongodb from '../../utils/mongodb';
import Produkt from '../../models/Produkt';
import { useState } from 'react';

export default function Produktseite({produkt}) {

    const [preis, setPreis] = useState(produkt.preis);
    const [extras, setExtras] = useState([]);
    const [menge, setMenge] = useState(1);

    const addExtra = (e, extra) =>{
        const checked = e.target.checked;
        if (checked){
            setPreis(preis + extra.preis)
            setExtras([...extras, extra])
        } else{
            setPreis(preis - extra.preis)
            setExtras(extras.filter((alleExtras) => alleExtras._id !== extra._id))
        }
    }

    if (!produkt) {
        return (
            <div>
                <h2>
                    Produkt nicht vorhanden
                </h2>
            </div>
        )
    }
    return (
        <div>
            <div>
                <Link href="/" className='text-dark'>       
                    ← zurück zur Übersicht
                </Link>
            </div>
            <div className='row row-cols-2 mt-2'>
                <div>
                    <Image className='rounded-3' src={produkt.bild} alt={produkt.name} width={600} height={600} layout='responsive' />
                </div>
                <div>
                    <h1>
                        {produkt.name}
                    </h1>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2 className='text-danger'>{preis} €</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            {produkt.beschreibung}
                        </ListGroupItem>
                        <ListGroupItem>
                            {produkt.extras.length ? "Extras: " : <p></p>}
                            {produkt.extras.map((extra)=>(
                                <span key={extra._id}>
                                  {extra.text} <input className='form-check-input me-2' 
                                  type="checkbox" 
                                  id={extra.text}
                                   onChange={(e) => addExtra(e, extra)} 
                                  />
                                </span>
                            ))}
                        </ListGroupItem>
                        <ListGroupItem>
                            <input className='form-control w-50' 
                                type="number" value={menge} min='1' max='100' 
                                onChange={(e) => setMenge(e.target.value)}
                            ></input>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className='row shadow'>
                                <Button variant='danger'>zum Warenkorb</Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    const url = context.params.url;
    await mongodb.dbConnect();
    const produkt = await Produkt.findOne({url}).lean();
    return {
      props: {
        produkt: JSON.parse(JSON.stringify(produkt))
      }
    }
  }