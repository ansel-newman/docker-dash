import subprocess
from flask import Response
from . import internal_methods


@internal_methods.verifyFacilityID
@internal_methods.verifyDockerEngine
@internal_methods.handleAppName
def stopApp(facility_id, app_name="", app_id="") -> Response:
  """
  Sends a command to docker to stop the specified app

  parameters:
    facility_id - this value is passed in the API route, for demo purposes this should always be "demo"
    app_name - this value is passed as an http parameter
  """

  # executing system command
  completedResponse = subprocess.run(f"docker stop {app_id}", capture_output=True)
  if completedResponse.returncode != 0:
    return Response(f"Failed to stop app", status=500)

  return Response("Success", status=200)