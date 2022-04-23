        <!-- Modal -->
        <div class="modal fade" id="modalInscription" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-transp">
                    <div class="modal-header bg-transp">
                        <h5 class="modal-title text-light" id="exampleModalLongTitle">Oserez-vous prénétrer dans le
                            donjon?</h5>
                    </div>
                    <div class="modal-body bg-transp">
                        <form autocomplete="off">
                            <input type="hidden" autocomplete="false" />
                            <div class="form-group">
                                <label for="username" class="text-light">Username</label>
                                <input type="text" class="form-control" name="username" id="username"
                                    placeholder="Username" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-light">Password</label>
                                <input type="password" class="form-control" name="password" id="password"
                                    placeholder="Password" required autocomplete="off">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer bg-transp">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            id="closeModal">S'enfuir</button>
                        <button type="button" class="btn btn-primary" id="inscription" data-stage="1">Entrer dans le
                            donjon</button>
                    </div>
                </div>
            </div>
        </div>

        </main>
        <div id="notifs"></div>
        <footer>
            <button type="button" class="btn btn-info text-light" data-toggle="modal" data-target="#modalInscription"
                id="modalLauncher">Inscription</button>
        </footer>