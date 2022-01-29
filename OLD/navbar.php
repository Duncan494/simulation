<nav>
    <input id="switch" type="checkbox"/>
    <label for="switch">☰</label>
    <a href="/" <?php if ($title === "Simulations") {echo 'class="active"';} ?>>Simulations</a>
    <ul>
        <?php
            $urls = array(
                'About' => '/about/',
            );
            foreach ($urls as $name => $url) {
                print '<li><a href="'.$url.'"'.(($title === $name) ? ' class="active" ': '').'>'.$name.'</a></li>';
            }
        ?>
    </ul>

</nav>