import parse from 'html-react-parser';
import useQuery from "../../../hooks/useQuery.js";
import { useEffect, useState, useContext } from 'react';
import { GET } from '../../../api/index.js';
import { SERVICE } from '../../../enum/service.js';
import { MessageContext } from '../../../context/MessageContext.jsx';
import { Helmet } from 'react-helmet';
function Publish(){
    const query = useQuery();
    const id = query.get("id");
    const { showMessage } = useContext(MessageContext);

    const [data, setData] = useState(null);
    const handleGetData = async () => {
        const response = await GET(`${SERVICE.EMAIL}/landing/retrive?id=${id}`);
        if (response.error) {
            showMessage(response.message, "error");
            return;
        }
        setData(response.data);
    }

    useEffect(() => {
        handleGetData();
    }, []);
    return (<>
    <Helmet>
        <title>{data?.title}</title>
        <meta name="description" content={data?.description} />
        <meta name="keywords" content={data?.keywords} />
    </Helmet>
    {data?.status !== "hidden" && data?.html && parse(data?.html)}
    </>);
}

export default Publish;