import { Table, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Bestellung({ bestellungen }) {
    const router = useRouter();
    const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];

    const statusUpdate = async (id, aktuellerStatus) => {
        try {
            if (aktuellerStatus <= 2) {
                await axios.put(`http://localhost:3000/api/bestellungen/` + id, { status: aktuellerStatus + 1 });
                router.reload();
            }
        } catch (error) {
            console.log(error)
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
                            </tr>
                        </thead>
                        {bestellungen.map((bestellung) => (
                            <tbody key={bestellung._id}>
                                <tr>
                                    <td>{bestellung._id}</td>
                                    <td>{bestellung.kunde}</td>
                                    <td>{bestellung.adresse}</td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={() => statusUpdate(bestellung._id, bestellung.status)}>{status[bestellung.status]}</Button>
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


export async function getServerSideProps() {
    const res = await axios.get(`http://localhost:3000/api/bestellungen`);
    return {
        props: { bestellungen: res.data },
    };
}