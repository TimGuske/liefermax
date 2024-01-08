 import Test from "../models/Test";
import mongodb from "../utils/mongodb";


export default function Home({ tests }) {

    const test = tests[0];
    return (
        <div>
            <h1>{test.name} und in weiterer Folge {test.zahl}</h1>
        </div>
    )
}

export async function getServerSideProps() {

    await mongodb.dbConnect();

    const tests = await Test.find({}).lean();
    console.log(tests);
    return {
        props: {
            tests: JSON.parse(JSON.stringify(tests))
        }
    }
}