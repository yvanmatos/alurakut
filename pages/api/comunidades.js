import { SiteClient } from 'datocms-client'

export default async function requestHandler(req, res) {
    const client = new SiteClient('4c35730f3229fec6a56c29ced175fe')
    
    if(req.method === 'POST') {
        const record = await client.items.create({
            itemType: '967762',
            ...req.body,
            // title: 'Comunidade Teste',
            // imageUrl: 'https://github.com/yvanmatos.png',
            // creatorslug: 'yvanmatos'
        })
        res.json({
            dados: 'Alguma coisa',
            record: record
        })
        return
    }

    res.status(404).json({
        message: 'Sem nada no GET, só no POST'
    })
}