import { Table, Spinner, Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Bestellung({ bestellung }) {
    const router = useRouter();
    const { nr } = router.query;

    let status;

    switch (bestellung.status) {
        case 0:
            status = "Eingegangen";
            break;
        case 1:
            status = "Zubereitung";
            break;
        case 2:
            status = "Unterwegs";
            break;
        case 3:
            status = "Ausgeliefert";
            break;
    }

    if (nr !== bestellung._id) {
        return (
            <div>
                <h2>Bestellnummer {nr} nicht in der Datenbank vorhanden!</h2>
                <h3>{bestellung.error}</h3>
                <Button variant='primary' onClick={() => router.push('/')}>zur Karte</Button>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Bestellstatus</h1>
                <div>
                    <div>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Bestell Nr.</th>
                                    <th>Kunde</th>
                                    <th>Adresse</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{nr}</td>
                                    <td>{bestellung.kunde}</td>
                                    <td>{bestellung.adresse}</td>
                                    <td>
                                        <span>{status} </span>
                                        {bestellung.status < 3 ? (<Spinner animation='border' variant='success' size='sm' />) : (<span>OK</span>)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Produktname</th>
                                    <th>Extras</th>
                                    <th>Menge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestellung.produkte.map((produkt)=>(
                                <tr key={produkt._id}>
                                    <td>{produkt.name}</td>
                                    <td>
                                        {produkt.extras.map((extra)=>(
                                            <span key={extra._id}>{extra} </span>
                                        ))}
                                    </td>
                                    <td>{produkt.menge}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <div className='shadow'>
                            <Card>
                                <Card.Header as="h5">Gesamt</Card.Header>
                                <Card.Body className='text-center'>
                                    <Card.Title>
                                        {bestellung.betrag} Euro
                                    </Card.Title>
                                    <Button variant='success disabled'>bezahlt</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export async function getServerSideProps({ params }) {
    let bestellung = null;

    if (params && params.nr) {
        try {

            const res = await axios.get(`/api/bestellungen/${params.nr}`);
            bestellung = res.data;
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
        }
    } else {
        console.error("Kein 'nr'-Parameter gefunden");
    }

    return {
        props: { bestellung }
    };
}