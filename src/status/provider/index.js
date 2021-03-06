module.exports = {
    setServiceInformation: setServiceInformation,
    addEventConsume: addEventConsume,
    setEventConsumeExample: setEventConsumeExample,
    addEventPublish: addEventPublish,
    setEventPublishExample: setEventPublishExample,
    getData: getData,
    reset: reset
};


var data = {
    service: {
        name: 'test-service'
    },
    events: {
        consume: [],
        publish: []
    }
};

var publishKeyLookup = {};
var publishExampleKeyLookup = {};
var consumeExampleKeyLookup = {};

function getData(){
    return data;
}

function reset(){
    data = {
        service: {
            name: 'test-service'
        },
        events: {
            consume: [],
            publish: []
        }
    };

    publishKeyLookup = {};
    publishExampleKeyLookup = {};
    consumeExampleKeyLookup = {};
}

function setServiceInformation( name ){
    data.service.name = name;
}

function addEventConsume( namespace, topic, shared, queueName, schema ){
    var event = {
        namespace: namespace,
        topic: topic,
        shared: shared == true,
        queueName: queueName || '',
        schema: schema || ''
    };

    data.events.consume.push(event);

    consumeExampleKeyLookup[namespace + topic] = {
        exampleAdded: false,
        idx: data.events.consume.length - 1
    };
}

function setEventConsumeExample( namespace, topic, example ){
    var key = namespace + topic;

    if( typeof consumeExampleKeyLookup[key] !== 'object' ){
        throw new Error(
            "unknown key: " + key
        );
    } else if( ! consumeExampleKeyLookup[key].exampleAdded ) {

        data.events.consume[consumeExampleKeyLookup[key].idx].example = example;

        consumeExampleKeyLookup[key].exampleAdded = true;
    }
}

function addEventPublish( namespace, topic, schema ){
    if( ! publishKeyLookup[namespace + topic] ){
        var event = {
            namespace: namespace,
            topic: topic,
            schema: schema || ''
        };

        data.events.publish.push(event);

        publishKeyLookup[namespace + topic] = true;

        publishExampleKeyLookup[namespace + topic] = {
            exampleAdded: false,
            idx: data.events.publish.length - 1
        };
    }
}

function setEventPublishExample( namespace, topic, example ){
    var key = namespace + topic;

    if( typeof publishExampleKeyLookup[key] !== 'object' ){
        throw new Error(
            "unknown key: " + key
        );
    } else if( ! publishExampleKeyLookup[key].exampleAdded ) {

        data.events.publish[publishExampleKeyLookup[key].idx].example = example;

        publishExampleKeyLookup[key].exampleAdded = true;
    }
}
