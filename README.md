# Interopen Hackathon

Notes from the day

Main content for the day is on the Google Spreadsheet: [https://docs.google.com/spreadsheets/d/16PGLc96aRH2ipBa79GUJJ_NYKZQv5RQPksT7g8GGELU/edit?ts=5bd2d5d6#gid=0]()


## Group 3 - A&E

**Group Participants:**

* Carl Marshall - OUH
* Mark Pengelly - OUH
* Hai 
* David Milward
* Simon Knee
* Jamie Hibbard
* Nuno Almeida
* Grant Vallance - OUH (Remote)

### The Project

Looking to address the admission to A&E and then discharge to the Wards.

Section G of the Spreadsheet - *In A&E, Michael is still confused and not coherent due to the seizure. The clinicians access Michael's Medical records for his problem list, allergies, and medications. Importantly they see he is a Type 2 Diabetic requiring insulin.*

What is the problem we're trying to solve?: Problem IDs: 50-55

Two stages:

1. Can we get the records from the providers?
2. Can we get the data to our clinicians?

Additionally later stage, what do we hand off to the ward?

**Assumption**: The consuming organisation is OUH and therefore Cerner.

#### References:

**FHIR Profiles**
1. L1
   * fhir.org
   * HL7 Default: [http://hl7.org/fhir/]()
2. L2 - UK FHIR Profile: [https://fhir.hl7.org.uk]()
   * things may be taken out
   * add extensions, e.g. NHSNumberStatusCode, SNOMEDDescriptionID
3.  L3 - [fhir.nhs.uk]()

Patient Record found by:

* Locate the patient by their NHS number on the reference system...
* Care Connect Ref Implementation: [https://data.developer.nhs.uk/ccri-fhir/STU3/Patient?identifier=9658218873]()
  * Returns a Patient ID (1183) which then unlocks the following...
* HiE Record: [https://data.developer.nhs.uk/ccri/ed/patient/1183/observation]()
* Medications: [https://data.developer.nhs.uk/ccri-fhir/STU3/MedicationStatement?patient=1183]()

#### Project Aims

**Big Picture** - Data should flow into the ED before the patient arrives at the doors. 111 and SCAS (ambulances) should share their data with OUH, which can then send out queries to other likely locations for data on this patient. The results of which can be shown within the PowerChart for the patient on arrival.

![](docs/img/Hackathon-context.png)






