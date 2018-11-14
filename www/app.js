function ViewModel() {
    var self = this;

    self.nhsNumber = ko.observable("");

    self.nhsNumber.subscribe(function() {
        // Fetch patient ID here.
        console.log(self.nhsNumber());
        self.test(self.nhsNumber());
    });

    self.test = ko.observable();
}

var vm = new ViewModel();


$(document).ready(function() {
    ko.applyBindings(vm);
});