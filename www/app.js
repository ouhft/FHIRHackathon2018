function ViewModel() {
    var self = this;

    self.nhsNumber = ko.observable("9658218872");
    self.patient = ko.observable(null);
    self.patientData = ko.observable(null);

    self.nhsNumber.subscribe(function() {
        // Fetch patient ID here.
        $.getJSON("https://data.developer.nhs.uk/ccri-fhir/STU3/Patient?identifier=" + self.nhsNumber(), function(data) {
            patientData = data["entry"][0];
            if (patientData) {
                console.log(patientData["resource"]);
                self.patient(patientData["resource"]);
            }
        });
    });

    self.patientId = ko.computed(function() {
        if (!(patient = self.patient())) return null;
        console.log("patientId: " + patient["id"])
        return patient["id"];
    });

    self.patientId.subscribe(function(value) {
        console.log("Fetch observations");
        if (value) {
            $.getJSON("https://data.developer.nhs.uk/ccri-fhir/STU3/Patient?_id=" + value + "&_revinclude=*", function(data) {
                console.log(data);
                self.patientData(data);
            })
        }
    });

    self.Patient = ko.computed(function() {
        if (!(patient = self.patient())) return null;

        console.log(patient["name"]);
        return {
            "name": patient["name"][0]["given"][0] + " " + patient["name"][0]["family"],
            "birthDay": patient["birthDate"],
        };
    });

    self.Allergies = ko.computed(function() {
        if (!(patientData = self.patientData())) return null;

        allergies = [];

        for(var entry of patientData["entry"]) {
            resource = entry["resource"];
            if (resource["resourceType"] == "AllergyIntolerance") {
                allergies.push({
                    "name": resource["code"]["coding"][0]["display"],
                });
            }
        }

        return allergies;
    });

    self.Procedures = ko.computed(function() {
        if (!(patientData = self.patientData())) return null;

        procs = [];

        for(var entry of patientData["entry"]) {
            resource = entry["resource"];
            if (resource["resourceType"] == "Procedure") {
                procs.push({
                    "name": resource["code"]["coding"][0]["display"],
                });
            }
        }

        return procs;
    });


    self.test = ko.observable();
}

var vm = new ViewModel();


$(document).ready(function() {
    ko.applyBindings(vm);
});