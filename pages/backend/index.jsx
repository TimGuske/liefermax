import { Table, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link';

export default function Bestellung({ bestellungen }) {
    const router = useRouter();
    const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];

    const statusUpdate = async (id, aktuellerStatus) => {
        try {
            if (aktuellerStatus <= 2) {
                await axios.put(`https://liefermax-seven.vercel.app/api/bestellungen/` + id, { status: aktuellerStatus + 1 });
                router.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const delteProduktFromDb = async (id) => {
        try {
            await axios.delete(`https://liefermax-seven.vercel.app/api/bestellungen/` + id);
            router.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Admin Backend</h1>
            <div className="row mt-4">
                <div className="col-12">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Bestell Nr.</th>
                                <th>Kunde</th>
                                <th>Adresse</th>
                                <th>Status</th>
                                <th>Löschen</th>
                            </tr>
                        </thead>
                        {bestellungen.map((bestellung) => (
                            <tbody key={bestellung._id}>
                                <tr>
                                    <td>
                                        <Link href={`https://liefermax-seven.vercel.app/bestellungen/${bestellung._id}`}>
                                            {bestellung._id}
                                        </Link>
                                    </td>
                                    <td>{bestellung.kunde}</td>
                                    <td>{bestellung.adresse}</td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={() => statusUpdate(bestellung._id, bestellung.status)}>{status[bestellung.status]}</Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => delteProduktFromDb(bestellung._id)}>X</Button>
                                    </td>

                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    
    const meinCookie = context.req?.cookies || '';

    if (meinCookie.token !== process.env.TOKEN) {
        return {
            redirect: { 
                destination: 'https://liefermax-seven.vercel.app/backend/login',
                permanent: false,
            }
        }
    }
    
    const res = await axios.get(`https://liefermax-seven.vercel.app/api/bestellungen`);
    return {
        props: { bestellungen: res.data },
    };
}