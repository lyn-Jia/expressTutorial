const { response } = require('express');
const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//Get Single Member
router.get('/:id', (request, respond) => {
    const found = members.some(member => member.id === member.id === parseInt(request.params.id));
    if(found) {
        respond.json(members.filter(member => member.id === parseInt(request.params.id)));
    } else {
        respond.status(400).json({ msg: `No member with the id of ${request.params.id}`});
    }

});

//Get All Members
router.get('/', (request, respond) => {
    respond.json(members);
});

//Create Member 
router.post('/', (request, respond) => {
    const newMember ={
        id: uuid.v4(),
        name: request.body.name,
        email: request.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return respond.status(400).json({msg: 'Please include a name and email'})
    }

    members.push(newMember);
    respond.json(members);
    //response.redirect('/');
});

router.put('/:id', (request, respond) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = request.body;
        members.forEach(member => {
            if(member.id === parseInt(request.params.id)){
                member.name = updMember.name ?  updMember.name : member.name;
                member.email =  updMember.email ? updmember.email : member.email;
            
            respond.json({ msg: 'Member updated', member });
            }
        });

    } else {
        respond.status(400).json({ msg: `No member with the id of ${request.params.id}`})
    }

})

router.delete('/:id', (request, respond) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        respond.json({ 
            msg: 'Member delted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        respond.status(400).json({ msg: `No member with the id of ${request.params.id}`})
    }

})


module.exports = router;