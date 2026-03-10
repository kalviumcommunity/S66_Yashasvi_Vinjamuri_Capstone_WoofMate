import ProcessStep from "./ProcessStep";

const RescueProcess = () => (
  <div className="mt-16">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      How our rescue process works
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProcessStep number="1" title="Report Submission">
        Fill out the form with as much detail as possible about the dog and its
        situation.
      </ProcessStep>
      <ProcessStep number="2" title="Assessment">
        Our team evaluates the report and determines the urgency and necessary
        resources.
      </ProcessStep>
      <ProcessStep number="3" title="Rescue Operation">
        Our rescue team is dispatched to safely retrieve the dog from the
        reported location.
      </ProcessStep>
      <ProcessStep number="4" title="Medical Care">
        The dog receives necessary medical attention, vaccinations, and
        treatments.
      </ProcessStep>
      <ProcessStep number="5" title="Rehabilitation">
        The dog is placed in foster care for recovery and behavioral
        rehabilitation if needed.
      </ProcessStep>
      <ProcessStep number="6" title="Adoption">
        Once healthy and ready, the dog is made available for adoption to find a
        forever home.
      </ProcessStep>
    </div>
  </div>
);

export default RescueProcess;
