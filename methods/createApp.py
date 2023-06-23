import subprocess
import flask
from . import internal_methods


@internal_methods.verifyFacilityID
@internal_methods.verifyDockerEngine
def createApp(facility_id) -> flask.Response:
  """
  Creates an app container from a given image name

  parameters:
    facility_id - this value is passed in the API route, for demo purposes this should always be "demo"
    image - this value is passed as an http parameter
  """

  image_name = flask.request.args.get("image")
  if image_name == None:
    return flask.Response("No image name provided", status=400)

  user_name = flask.request.args.get("user")
  if user_name == None:
    return flask.Response("No user name provided", status=400)

  version = flask.request.args.get("version")
  if version == None:
    version = "latest"

  # checking if image exists
  completedProcess = subprocess.run(f"docker image ls --format \"{{{{.Repository}}}}\"", capture_output=True)
  if image_name not in completedProcess.stdout.decode().split("\n"):
    return flask.Response(f"Could not find image \"{image_name}\"", status=400)

  container_name = image_name + "." + user_name

  # checking if container already exists
  completedProcess = subprocess.run(f"docker ps -a --format \"{{{{.Names}}}}\"", capture_output=True)
  if container_name in completedProcess.stdout.decode().split("\n"):
    return flask.Response("App already exists", status=400)

  # executing system command
  completedProcess = subprocess.run(f"docker create --name \"{container_name}\" --pull never {image_name}", capture_output=True)
  if completedProcess.returncode != 0:
    # uncaught error
    return flask.make_response(f"Failed to create app", 500)

  return flask.make_response("Success", 200)